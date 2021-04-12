import { render, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import Rupteur from './Rupteur';
import { PREFIX } from '../../utils/constants';

describe('<Rupteur />', () => {

    afterEach(cleanup);
    it('Check snapshot', () => {
        const { asFragment } = render(<Rupteur/>);
        expect(asFragment()).toMatchSnapshot();
    });


    it('Check change with localStorage state',async () => {
        const 
            { getByTestId } = render(<Rupteur/>),
            ls = window.localStorage.getItem(PREFIX + "theme");
            
        expect(getByTestId('rupteur')).toHaveAttribute("data-theme");
        waitFor(()=>expect(ls).toEqual('light'));
    });

    it('if click on rupteur',async () => {
        const 
            { getByTestId } = render(<Rupteur/>),
            rupteur = getByTestId('rupteur'),
            body = document.querySelector('body');

        expect(getByTestId('rupteur')).toHaveAttribute("data-theme");
        expect(rupteur.getAttribute('data-theme')).toEqual('light');


        fireEvent.click(rupteur);

        expect(body.getAttribute('data-theme')).toEqual('dark');
        expect(rupteur.getAttribute('data-theme')).toEqual('dark');

        fireEvent.click(rupteur);
        expect(body.getAttribute('data-theme')).toEqual('light');
    });
});
