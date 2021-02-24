import Component from '../src/MainComponent';
import { render, screen, act, waitFor } from "@testing-library/react";

describe('Tests for the component', () => {
    test('Renders sucessfully', () => {
      render(<Component />);
    });
    test('Sync function', async () => {
        const wrapper = render(<Component/>);
        expect(wrapper.container.textContent).toContain('0');
        act(() => screen.getByTestId('sync').click());
        expect(wrapper.container.textContent).toContain('1');
    })
})