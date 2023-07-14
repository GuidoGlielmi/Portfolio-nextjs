import {FC, SVGProps, useEffect, useRef, useState} from 'react';

export const useDynamicSvg: React.FC<any> = path => {
  const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>> | any>();
  const [loading, setLoading] = useState(false);
  useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        // Changing this line works fine to me
        ImportedIconRef.current = (await import(`../../icons/techs/${path}`)).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, []);

  if (!loading && ImportedIconRef.current) {
    const {current: ImportedIcon} = ImportedIconRef;
    return <ImportedIcon />;
  }
  return null;
};

/*
import {FC, SVGProps, useEffect, useRef, useState} from 'react';

export const useDynamicSvgs = (fileNames: any) => {
  const ImportedIconRef = useRef<FC<SVGProps<SVGSVGElement>> | any>();
  const [loading, setLoading] = useState(false);
  useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        // Changing this line works fine to me
        const Svgs = await Promise.all(
          fileNames.map((fn: any) => import(`../../icons/techs/${fn}.tsx`)),
        );
        ImportedIconRef.current = Svgs;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, []);

  if (!loading && ImportedIconRef.current) {
    const {current: ImportedIcon} = ImportedIconRef;
    return ImportedIcon.map((i: any) => i.default);
  }
  return null;
};

*/
