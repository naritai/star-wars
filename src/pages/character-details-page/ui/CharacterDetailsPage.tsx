import { classNames } from "shared/lib/classNames";
import { EditCharacterCard } from "features/edit-character";
import cls from "./CharacterDetailsPage.module.scss";
import { ErrorBoundary } from "app/providers/error-boundary";
import { Message } from "shared/ui/message";
import { ERROR_TEXTS } from "shared/constants";

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
      <ErrorBoundary
        fallback={<Message text={ERROR_TEXTS.GENERAL_ERROR} error={true} />}
      >
        <EditCharacterCard edit={edit} />
      </ErrorBoundary>
    </section>
  );
}
