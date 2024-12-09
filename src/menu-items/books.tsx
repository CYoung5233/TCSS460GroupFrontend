// third-party
import { FormattedMessage } from 'react-intl';

// assets
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';
import Book from '@ant-design/icons/BookOutlined';
import Search from '@ant-design/icons/SearchOutlined';
import ChromeOutlined from '@ant-design/icons/ChromeOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  QuestionOutlined,
  StopOutlined,
  PhoneOutlined,
  FullscreenOutlined,
  Book,
  Search,
  ChromeOutlined,
  AutoStoriesIcon
};

// ==============================|| BOOK ITEMS - SUPPORT ||============================== //


  
const version1: NavItemType = {
    id: 'version1',
    title: <FormattedMessage id="version1" />,
    type: 'collapse',
    icon: icons.AutoStoriesIcon,
    children: [
        {
            id: 'Add Book',
            title: <FormattedMessage id="add-book" />,
            type: 'item',
            url: '/add-book',
            icon: icons.Book
          },
          {
            id: 'Search Books',
            title: <FormattedMessage id="search-books" />,
            type: 'item',
            url: '/search-book',
            icon: icons.Search
          },
    ]};
const version2: NavItemType = {
    id: 'version2',
    title: <FormattedMessage id="version2" />,
    type: 'collapse',
    icon: icons.AutoStoriesIcon,
    children: [
        {
            id: 'add-book-new',
            title: 'Add Book New',
            type: 'item',
            url: '/add-book-new',
            icon: icons.Book
          },
        {
            id: 'search',
            title: <FormattedMessage id="search" />,
            type: 'item',
            url: '/search',
            icon: icons.ChromeOutlined
        }
    ]};

const books: NavItemType = {
  id: 'books',
  title: <FormattedMessage id="books" />,
  type: 'group',
  children: [
    version1,
    version2
  ]
};

export default books;
