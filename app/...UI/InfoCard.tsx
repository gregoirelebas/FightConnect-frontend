import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface InfoCardProps {
  icon: IconProp;
  text: string;
  data: string;
  bgColor: string;
  textColor: string;
}

export default function InfoCard(props: InfoCardProps) {
  return (
    <div className={`h-fit pl-2 rounded-2xl ${props.bgColor}`}>
      <div className="h-full flex flex-col p-5 rounded-l-none rounded-xl gap-2 bg-foreground">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={props.icon} className={`${props.textColor}`} />
          <span className="text-xl">{props.text}</span>
        </div>
        <span className={`${props.textColor} text-lg`}>{props.data}</span>
      </div>
    </div>
  );
}
