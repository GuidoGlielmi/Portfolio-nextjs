import {debounce} from 'helpers/debounce';
import React, {useEffect, useState} from 'react';
import S from './Navigation.module.css';

type NavigationProps = {
  refs: {ref: React.RefObject<HTMLDivElement>; title: string}[];
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
      {refs.map(({ref, title}, i) => (
        <p
          className={selectedSection === i ? S.selectedSectionName : ''}
          onClick={() => {
            ref.current?.scrollIntoView({behavior: 'smooth'});
          }}
          key={title}
        >
          {title}
        </p>
      ))}
    </div>
  );
};

export default Navigation;
