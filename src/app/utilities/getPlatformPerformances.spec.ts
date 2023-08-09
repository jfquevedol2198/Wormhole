import { getPlatformPerformances } from './getPlatformPerformances';
import { IPlatformPerformance } from '../interfaces/platform.interface';
import { IPNLPositionDetails } from '../interfaces/pnlPosition.interface';

describe('Get Platform Performances', () => {
    const pnlPositionsDetails: IPNLPositionDetails[] = require('../../mocks/pnlPositionsDetails.json');
    const platformPerformances: IPlatformPerformance[] = require('../../mocks/platformPerformances.json');
    it('should get platform performances', () => {
        expect(getPlatformPerformances(pnlPositionsDetails)).toEqual([platformPerformances[0]]);
    });
});
