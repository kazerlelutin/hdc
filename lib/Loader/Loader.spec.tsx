import { render, cleanup } from '@testing-library/react';
import Loader from './Loader';

describe('<Loader />', () => {

    afterEach(cleanup);
    it('Check snapshot', () => {
        const { asFragment } = render(<Loader/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
