import { render, cleanup } from '@testing-library/react';
import Home from '../pages';
import MyApp from '../pages/_app';

describe('Pages snapshots', () => {

    afterEach(cleanup);

    it('snap <MyApp />', () => {
        const { asFragment } = render(<MyApp Component={Home} pageProps={{test:"test"}}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it('snap <Home />', () => {
        const { asFragment } = render(<Home/>);
        expect(asFragment()).toMatchSnapshot();
    });
});