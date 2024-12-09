// third-party
import { FormattedMessage } from 'react-intl';

// assets
import QuestionOutlined from '@ant-design/icons/QuestionOutlined';
import StopOutlined from '@ant-design/icons/StopOutlined';
import PhoneOutlined from '@ant-design/icons/PhoneOutlined';
import FullscreenOutlined from '@ant-design/icons/FullscreenOutlined';
import Book from '@ant-design/icons/BookOutlined';
import Search from '@ant-design/icons/SearchOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = {
  QuestionOutlined,
  StopOutlined,
  PhoneOutlined,
  FullscreenOutlined,
  Book,
  Search
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other: NavItemType = {
  id: 'other',
  title: <FormattedMessage id="others" />,
  type: 'group',
  children: [
    {
      id: 'Add Book',
      title: <FormattedMessage id="add-book" />,
      type: 'item',
      url: '/add-book',
      icon: icons.Book
    },
    {
      id: 'add-book-new',
      title: 'Add Book New',
      type: 'item',
      url: '/add-book-new',
      icon: icons.Book
    },
    {
      id: 'Search Books',
      title: <FormattedMessage id="search-books" />,
      type: 'item',
      url: '/search-book',
      icon: icons.Search
    },
    {
      id: 'full-page',
      title: <FormattedMessage id="full-page" />,
      type: 'item',
      url: '/full-page',
      icon: icons.FullscreenOutlined
    },
    {
      id: 'documentation',
      title: <FormattedMessage id="documentation" />,
      type: 'item',
      url: 'https://uwt-set-tcss460-lecture-materials.github.io/TCSS460-phase-2/',
      icon: icons.QuestionOutlined,
      external: true,
      target: true
    }
  ]
};

export default other;
