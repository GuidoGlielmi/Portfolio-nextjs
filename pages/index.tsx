import Link from 'next/link';
import S from './styles.module.css';
import {motion} from 'framer-motion';
import Head from 'next/head';
const About: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        transition={{
          type: 'spring',
        }}
      >
        <Link href='/about'>
          <div className={S.background}>
            <div>
              <div className={S.backgroundBottom} />
            </div>
            <div>
              <div className={S.backgroundRight} />
            </div>
            <div>
              <div className={S.backgroundLeft} />
            </div>
            <div className={S.info}>
              <img src={'assets/img/profile-img.jpg'} alt='profile' />
              <div>
                <h1>
                  <p>Welcome to my personal page!</p>
                  <p> I'm a web developer</p>
                </h1>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
};

export default About;
