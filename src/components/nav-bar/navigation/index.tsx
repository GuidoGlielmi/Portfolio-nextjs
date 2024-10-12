import {debounce} from 'helpers/debounce';
import {useEffect, useState} from 'react';
import S from './Navigation.module.css';

type NavigationProps = {
  refs: Ref[];
};

const Navigation = ({refs}: NavigationProps) => {
  const [selectedSection, setSelectedSection] = useState(0);

  useEffect(() => {
    const extraMargin = 40;
    const checkSelectedSection = () => {
      setSelectedSection(
        Number(window.scrollY >= (refs[0].ref.current?.clientHeight || 0) - extraMargin),
      );
    };
    document.addEventListener('scroll', debounce(checkSelectedSection, 100));
    return () => removeEventListener('scroll', checkSelectedSection);
  }, []);

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
