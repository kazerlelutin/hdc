import { render, cleanup } from '@testing-library/react';
import Nav from './Nav';

describe('<Nav />', () => {

    afterEach(cleanup);

    it('Check snapshot', () => {
        const { asFragment } = render(<Nav/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
