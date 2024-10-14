import {AnimatePresence, motion} from 'framer-motion';
import useTranslation from 'hooks/useTranslation';
import {useState} from 'react';
import Chevron from '../../../../../../public/icons/chevron';
import S from './Articles.module.css';

type ArticlesProps = {user: IUser};

const Articles = ({user}: ArticlesProps) => {
  const [articlesTitle] = useTranslation(["I've written some articles in Medium™"]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const nextIndex = () => {
    setSelectedIndex(pi => (pi === user.articles.length - 1 ? 0 : pi + 1));
  };

  return (
    <div className={S.articlesSection}>
      <h3>{articlesTitle}</h3>
      <div className={S.articlesContainer}>
        <div style={{position: 'relative'}}>
          <AnimatePresence>
            <motion.div
              key={selectedIndex}
              transition={{duration: 0.2}}
              initial={{y: -5, opacity: 0}}
              animate={{y: 0, opacity: 1}}
              exit={{y: 5, opacity: 0}}
            >
              <a
                href={user.articles[selectedIndex].url}
                target='_blank'
                referrerPolicy='no-referrer'
              >
                {user.articles[selectedIndex].title}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
        <button onClick={nextIndex} aria-label='Next article' type='button'>
          <Chevron />
        </button>
      </div>
    </div>
  );
};

export default Articles;
