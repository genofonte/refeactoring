import {Province, sampleProvinceData} from './production_plan'

describe('', () => {
  test('shortfall', () => {
    const sampleData = sampleProvinceData();
    const asia = new Province(sampleData);
    expect(asia.shortfall).toBe(5);
  })
});