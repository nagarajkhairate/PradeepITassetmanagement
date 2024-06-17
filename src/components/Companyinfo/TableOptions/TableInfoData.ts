import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import HealthAndSafetyOutlinedIcon from '@mui/icons-material/HealthAndSafetyOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export const TableInfoData = [
    {
        "id": 3,
        "title": "Contracts / Licenses",
        "description": "If your assets are under a contract or certain agreement you want to consider activating this option. Software licenses can also be managed under this option.",
        "formLabel": "Enable Contracts:",
        "icon":TuneOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "contracts"
            },
            {
                "label": "No",
                "value": "no",
                "name": "contracts"
            }
        ]
    },
    {
        "id": 4,
        "title": "Insurance",
        "description": "Insurance can be a hassle to manage and remember. Enable this option to allow insurance variables to be allocated to your assets. A blanket insurance can be allocated to multiple assets.",
        "formLabel": "Enable Insurance:",
        "icon":HealthAndSafetyOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "insurance"
            },
            {
                "label": "No",
                "value": "no",
                "name": "insurance"
            }
        ]
    },
    {
        "id": 5,
        "title": "Funding",
        "description": "Activate this feature to add Funding to be used when purchasing assets. This can help if you are a not-for-profit organization and have certain funds for different needs. It can also be used in for-profit companies to allocate a budget for asset purchases.",
        "formLabel": "Enable Funding:",
        "icon":AccountBalanceOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "funding"
            },
            {
                "label": "No",
                "value": "no",
                "name": "funding"
            }
        ]
    },
    {
        "id": 6,
        "title": "Maintenances",
        "description": "Enable to view when an asset has been through a maintenance event and the ability to schedule the routine frequency of having that asset checked for repairs.",
        "formLabel": "Enable Asset's Maintenances:",
        "icon":SettingsApplicationsOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "maintenances"
            },
            {
                "label": "No",
                "value": "no",
                "name": "maintenances"
            }
        ]
    },
    {
        "id": 7,
        "title": "Warranties",
        "description": "Enable the ability to add when an asset’s warranty will expire and be notified of the event.",
        "formLabel": "Enable Asset's Warranty:",
        "icon": NewReleasesOutlinedIcon,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "warranties"
            },
            {
                "label": "No",
                "value": "no",
                "name": "warranties"
            }
        ]
    },
    {
        "id": 8,
        "title": "Sub Categories ",
        "description": "Enable the ability to add sub-categories and assign an asset to those sub-categories.",
        "formLabel": "Allocate assets to Sub Categories:",
        "icon":ListAltOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "sub categories "
            },
            {
                "label": "No",
                "value": "no",
                "name": "sub categories "
            }
        ]
    },
    {
        "id": 9,
        "title": "Departments",
        "description": " Enable the ability to add departments and assign asset to those departments.",
        "formLabel": "Allocate assets to Departments:",
        "icon":ListOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "departments"
            },
            {
                "label": "No",
                "value": "no",
                "name": "departments"
            }
        ]
    },
    {
        "id": 10,
        "title": "Audit",
        "description": "Enable the ability to perform audits of assets to ensure they are still in locations/departments that were previously reported and take actions if not",
        "formLabel": "Asset Audit:",
        "icon": VerifiedUserOutlinedIcon,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "audit"
            },
            {
                "label": "No",
                "value": "no",
                "name": "audit"
            }
        ]
    },
    {
        "id": 11,
        "title": "Multiple Photos of an Asset",
        "description": "Enable to have multiple photos of each asset. Otherwise, only one photo of the asset will be allowed.",
        "formLabel": "Assets Photos",
        "icon":CameraAltOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "photos"
            },
            {
                "label": "No",
                "value": "no",
                "name": "photos"
            }
        ]
    },
    {
        "id": 12,
        "title": "Documents",
        "description": "Enable the ability to have various PDF, Word or Excel documents stored with the asset. These can include asset directions, purchase orders or invoices that may be associated with the asset.",
        "formLabel": "Asset Documents",
        "icon":DescriptionOutlinedIcon ,
        "options": [
            {
                "label": "Yes",
                "value": "yes",
                "name": "documents"
            },
            {
                "label": "No",
                "value": "no",
                "name": "documents"
            }
        ]
    }
]
