import useEventListener from '@hooks/useEventListener';
import {debounce} from 'helpers/debounce';
import {useState} from 'react';
import S from './Navigation.module.css';

type NavigationProps = {
  refs: Ref[];
};

const extraMargin = 150;
const Navigation = ({refs}: NavigationProps) => {
  const [selectedSection, setSelectedSection] = useState(0);

  const checkSelectedSection = debounce(() => {
    let i = 0;
    for (const r of refs) {
      const {top = 0, height = 0} = r.ref.current?.getBoundingClientRect() || {};
      const minY = top + window.scrollY - extraMargin;
      const maxY = minY + height;
      if (window.scrollY >= minY && window.scrollY <= maxY) return setSelectedSection(i);
      i++;
    }
  }, 100);
  useEventListener({event: 'scroll', fn: checkSelectedSection});

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
