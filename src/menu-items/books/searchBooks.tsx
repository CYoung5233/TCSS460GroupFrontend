// third-party
import { FormattedMessage } from 'react-intl';

// assets/icons
import SearchOutlined from '@ant-design/icons/SearchOutlined';

// type
import { NavItemType } from 'types/menu';

// icons
const icons = { SearchOutlined };

// ==============================|| SEARCH BOOKS MENU ITEM ||============================== //

const searchBooks: NavItemType = {
  id: 'search-books',
  title: <FormattedMessage id="search-books" defaultMessage="Search Books" />,
  type: 'item',
  url: '/books/search',
  icon: icons.SearchOutlined,
};

export default searchBooks;
