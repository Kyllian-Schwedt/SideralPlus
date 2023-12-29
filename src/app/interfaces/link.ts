import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

export interface Link {
  name: string;
  path: string;
  icon: IconDefinition;
  childLinks: Link[];
  isCurrent: boolean;
}
