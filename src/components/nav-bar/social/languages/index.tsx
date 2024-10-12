import Ar from 'components/common/icons/flags/Ar';
import Eu from 'components/common/icons/flags/Us';
import {LanguageContext, LanguageProps} from 'components/contexts/language';
import {useContext, useEffect, useRef, useState} from 'react';
import S from './Languages.module.css';

const Languages = () => {
  const {eng, setEng} = useContext(LanguageContext) as LanguageProps;

  const [position, setPosition] = useState(0);
  const [langsHovered, setLangsHovered] = useState<boolean>(false);

  const previousEng = useRef(eng);

  const invertFlagPosition = () => setPosition(pp => (pp === 100 ? pp - 100 : pp + 100));

  const onTouchEndHandler = () => {
    invertFlagPosition();
    setEng(ps => !ps);
  };

  useEffect(() => {
    if (langsHovered) {
      invertFlagPosition();
      previousEng.current = eng;
    } else if (eng !== null && previousEng.current === eng) invertFlagPosition();
  }, [langsHovered]);

  useEffect(() => {
    if (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0
    ) {
      return;
    }
    if (eng === false && previousEng.current === null) {
      setPosition(pp => (pp === 100 ? pp - 100 : pp + 100));
    }
  }, [eng]);

  return (
    <div
      className={S.languages}
      onMouseEnter={() => setLangsHovered(true)}
      onMouseLeave={() => setLangsHovered(false)}
    >
      <button
        style={{right: `${position}%`}}
        onTouchEnd={e => {
          e.preventDefault();
          onTouchEndHandler();
        }}
        onClick={() => setEng(true)}
        aria-label='Translate to english'
      >
        <Eu size='100%' round />
      </button>
      <button
        style={{right: `${position}%`}}
        onTouchEnd={e => {
          e.preventDefault();
          onTouchEndHandler();
        }}
        onClick={() => setEng(false)}
        aria-label='Translate to spanish'
      >
        <Ar size='100%' round />
      </button>
    </div>
  );
};

export default Languages;
