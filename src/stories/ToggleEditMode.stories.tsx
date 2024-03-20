import {ToggleEditMode} from '../components/toggleEditMode/ToggleEditMode';
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof ToggleEditMode> = {
    title: 'TODOLISTS/ToggleEditMode',
    component: ToggleEditMode,

    parameters: {layout: 'centered'},
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        },
    },
    args:{
        title:'Hello',
    }
};

export default meta;
type Story = StoryObj<typeof ToggleEditMode>;

export const EditableSpanStory: Story = {

};