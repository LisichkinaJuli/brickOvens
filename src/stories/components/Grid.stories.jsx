import { Grid } from './Grid'

export default {
    title: 'components/Grid',
    component: Grid,
    argTypes: {
        onPinTask: { action: 'onPinTask' },
        onArchiveTask: { action: 'onArchiveTask' },
    },
};

export const Default = {
    args: {
        task: {
            id: '1',
            title: 'Test Task',
            state: 'TASK_INBOX',
        },
    },
};
