import type {Meta, StoryObj} from '@storybook/react';

import {action} from '@storybook/addon-actions'

// import {ReduxStoreProviderDecorator} from '../../stories/decorators/ReduxStoreProviderDecorator';
// import {Pagination} from './Pagination';
//
//
//
// const meta: Meta<typeof Pagination> = {
//     title: 'TODOLISTS/Pagination',
//     component: Pagination,
//     parameters: {layout: 'centered'},
//     tags: ['autodocs'],
//
//     argTypes: {
//         changePage: {
//             description: 'Button clicked inside form',
//             action: 'clicked'
//         }
//     },
//     decorators:[ReduxStoreProviderDecorator]
// };
//
// export default meta;
//
// type Story = StoryObj<typeof Pagination>;
//
// export const PaginationStory: Story = {
//     args: {
//         itemsLength: 10,
//         pageSize: 2,
//         currentPage: 1,
//         changePage: action('Number of pages to change page handler')
//     },
// };