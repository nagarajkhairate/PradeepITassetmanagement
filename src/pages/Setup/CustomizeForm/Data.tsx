export interface Component {
    id: number;
    createdBy: string;
    createdOn: string;
    updatedBy: string;
    updatedOn: string;
    type: string;
    format: string;
    isActive: boolean;
    isEnabled: boolean;
    user: number;
}

export interface FormData {
    id: number;
    fieldName: string;
    value: string;
    sequence: number;
    components: Component;
    isActive: boolean;
    isRequired: boolean;
    visible: boolean;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
    user: number;
}

export const DummyData: FormData[] = [
    {
        id: 1,
        fieldName: 'Description',
        value: 'description',
        sequence: 2,
        isActive: true,
        isRequired: true,
        components: {
            id: 2,
            createdBy: 'admin',
            createdOn: '2024-06-11T04:54:40.668630Z',
            updatedBy: 'admin',
            updatedOn: '2024-06-11T04:54:40.668630Z',
            type: 'text',
            format: 'select',
            isActive: true,
            isEnabled: true,
            user: 1,
        },
        visible: true,
        createdAt: '2024-06-11T04:57:26.417231Z',
        updatedAt: '2024-06-11T04:57:26.417231Z',
        createdBy: 'admin',
        updatedBy: 'admin',
        user: 1,
    },
    {
        id: 2,
        fieldName: 'Asset Tag ID2',
        value: 'assetTagID',
        sequence: 1,
        isActive: true,
        isRequired: true,
        components: {
            id: 2,
            createdBy: 'admin',
            createdOn: '2024-06-11T04:54:40.668630Z',
            updatedBy: 'admin',
            updatedOn: '2024-06-11T04:54:40.668630Z',
            type: 'select',
            format: 'select',
            isActive: true,
            isEnabled: true,
            user: 1,
        },
        visible: true,
        createdAt: '2024-06-11T04:57:26.417231Z',
        updatedAt: '2024-06-11T04:57:26.417231Z',
        createdBy: 'admin',
        updatedBy: 'admin',
        user: 1,
    },
    {
        id: 3,
        fieldName: 'Asset Tag ID',
        value: 'assetTagID',
        sequence: 3,
        isActive: true,
        isRequired: true,
        components: {
            id: 2,
            createdBy: 'admin',
            createdOn: '2024-06-11T04:54:40.668630Z',
            updatedBy: 'admin',
            updatedOn: '2024-06-11T04:54:40.668630Z',
            type: 'select',
            format: 'select',
            isActive: true,
            isEnabled: true,
            user: 1,
        },
        visible: true,
        createdAt: '2024-06-11T04:57:26.417231Z',
        updatedAt: '2024-06-11T04:57:26.417231Z',
        createdBy: 'admin',
        updatedBy: 'admin',
        user: 1,
    },
];