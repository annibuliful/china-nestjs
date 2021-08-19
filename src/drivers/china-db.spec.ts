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
describe('test database ', () => {
  let dbDriver: ChinaDbDriver<IMockDto>;
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
});
