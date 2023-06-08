import { classNames } from "shared/lib/classNames";
import { EditCharacterCard } from "features/edit-character";
import cls from "./CharacterDetailsPage.module.scss";

interface CharacterDetailsPageProps {
  className?: string;
  edit?: boolean;
}

export default function CharacterDetailsPage({
  className,
  edit = false,
}: CharacterDetailsPageProps): JSX.Element {
  return (
    <section className={classNames(cls.characterdetailspage, {}, [className])}>
      <EditCharacterCard edit={edit} />
    </section>
  );
}
