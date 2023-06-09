import { classNames } from 'shared/lib/classNames';
import { CharacterList } from 'widgets/character-list';
import { CharacterSearch } from 'features/character-search';
import { CharactersPagination } from 'features/characters-pagination';
import { useCharactersFetcher } from './useCharactersFetcher';
import cls from './CharactersPage.module.scss';

interface CharactersPageProps {
  className?: string;
}

export default function CharactersPage(
  props: CharactersPageProps
): JSX.Element {
  const { className } = props;
  const fetchCharacters = useCharactersFetcher();

  return (
    <section className={classNames(cls.characterspage, {}, [className])}>
      <CharacterSearch handleFetchCharacters={fetchCharacters} />
      <CharactersPagination handleFetchCharacters={fetchCharacters} />
      <CharacterList />
    </section>
  );
}
