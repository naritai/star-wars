import { classNames } from "shared/lib/classNames";
import { selectCharactersState } from "entities/character";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { FetchStatus } from "shared/api/types";
import { fetchCharacters } from "entities/character/api";
import { AppDispatch } from "app/providers/store-provider";
import { CharacterList } from "widgets/character-list";
import { CharacterSearch } from "features/character-search";
import { CharactersPagination } from "features/characters-pagination";
import cls from "./CharactersPage.module.scss";

interface CharactersPageProps {
  className?: string;
}

export default function CharactersPage({
  className,
}: CharactersPageProps): JSX.Element {
  const { status } = useSelector(selectCharactersState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === FetchStatus.IDLE) {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  return (
    <section className={classNames(cls.characterspage, {}, [className])}>
      <CharacterSearch />
      <CharactersPagination />
      <CharacterList />
    </section>
  );
}
