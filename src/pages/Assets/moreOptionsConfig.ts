import PersonIcon from '@mui/icons-material/Person';
import SendIcon from '@mui/icons-material/Send';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import BuildIcon from '@mui/icons-material/Build';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import RecyclingIcon from '@mui/icons-material/Recycling';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SellIcon from '@mui/icons-material/Sell';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const moreOptionsConfig = [
  {
    label: "Check Out",
    icon: PersonIcon,
   path:"/assets/checkOutOption"
  },
  {
    label: "Lease",
    icon: SendIcon,
    path: "/lease"
  },
  {
    label: "Lost/Missing",
    icon: ThumbDownIcon,
    path: "/lost-missing"
  },
  {
    label: "Repair",
    icon: BuildIcon,
    path: "/repair"
  },
  {
    divider: true,
  },
  {
    label: "Broken",
    icon: BrokenImageIcon,
    path: "/broken"
  },
  {
    label: "Dispose",
    icon: RecyclingIcon,
    path: "/dispose"
  },
  {
    label: "Donate",
    icon: FavoriteIcon,
    path: "/donate"
  },
  {
    label: "Sell",
    icon: SellIcon,
    path: "/sell"
  },
  {
    divider: true,
  },
  {
    label: "Delete",
    icon: DeleteIcon,
    path: "/delete"
  },
  {
    label: "Email",
    icon: EmailIcon,
    path: "/email"
  },
  {
    label: "Replicate",
    icon: ContentCopyIcon,
    path: "/replicate"
  },
];

export default moreOptionsConfig;
