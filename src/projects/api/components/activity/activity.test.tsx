import {render,screen} from '@testing-library/react'
import React from 'react'
import { Activity } from './index'



test('render Activity', () => {
    render(<Activity activity={''}/>)

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
})