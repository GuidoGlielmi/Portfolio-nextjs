import useEventListener from '@hooks/useEventListener';
import {debounce} from 'helpers/debounce';
import {useState} from 'react';
import S from './Navigation.module.css';

type NavigationProps = {
  refs: Ref[];
};

const extraMargin = 40;
const Navigation = ({refs}: NavigationProps) => {
  const [selectedSection, setSelectedSection] = useState(0);

  const checkSelectedSection = debounce(() => {
    setSelectedSection(
      Number(window.scrollY >= (refs[0].ref.current?.clientHeight || 0) - extraMargin),
    );
  }, 100);
  useEventListener('scroll', checkSelectedSection);

  return (
    <div className={S.sectionsNames}>
      {refs.map(({title, href}, i) => (
        <a href={href} className={selectedSection === i ? S.selectedSectionName : ''} key={title}>
          {title}
        </a>
      ))}
    </div>
  );
};

export default Navigation;
