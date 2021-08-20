import { nanoid } from 'nanoid';
import { ChinaDbDriver } from './china-db';

interface IMockDto {
  id?: string;
  title: string;
  completed: boolean;
}

const MOCK_INSERT_DATA = {
  title: 'MOCK_TITLE',
  completed: false,
};

type MOCK_QUERY = Omit<IMockDto, 'id'>;

describe('test database ', () => {
  let dbDriver: ChinaDbDriver<IMockDto, MOCK_QUERY>;
  beforeAll(() => {
    dbDriver = new ChinaDbDriver('title');
  });
  afterEach(() => {
    dbDriver.resetStores();
  });
  it('insert new record', async () => {
    const result = await dbDriver.insert(MOCK_INSERT_DATA);
    expect(result.id).toBeDefined();
    expect(result.completed).toEqual(MOCK_INSERT_DATA.completed);
    expect(result.title).toEqual(MOCK_INSERT_DATA.title);
  });

  it('insert duplicate record', async () => {
    await dbDriver.insert(MOCK_INSERT_DATA);
    expect(dbDriver.insert(MOCK_INSERT_DATA)).rejects.toEqual(
      'Duplicate title',
    );
  });
  it('get records', async () => {
    await dbDriver.insert({
      title: `MOCK_TITLE_${nanoid()}`,
      completed: false,
    });
    await dbDriver.insert({
      title: `MOCK_TITLE_${nanoid()}`,
      completed: false,
    });
    await dbDriver.insert({
      title: `MOCK_TITLE_${nanoid()}`,
      completed: false,
    });
    await dbDriver.insert({
      title: `MOCK_TITLE_${nanoid()}`,
      completed: true,
    });
    const result = await dbDriver.get({ title: 'MOCK_', completed: true });
    expect(result.length).toEqual(1);
    expect(result[0].completed).toEqual(true);
  });
});
