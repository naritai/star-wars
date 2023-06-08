import { classNames } from "shared/lib/classNames";
import cls from "./NotFoundPage.module.scss";
import { Message } from "shared/ui/message";
import { ERROR_TEXTS } from "shared/constants";

interface NotFoundPageProps {
  className?: string;
}

export function NotFoundPage({ className }: NotFoundPageProps): JSX.Element {
  return (
    <section className={classNames(cls.notfoundpage, {}, [className])}>
      <Message className={cls.offsetter} text={ERROR_TEXTS.PAGE_NOT_FOUND} />
    </section>
  );
}
