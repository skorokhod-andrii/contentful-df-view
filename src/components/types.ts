import { PlainClientAPI } from "contentful-management";
import { FieldExtensionSDK } from "@contentful/app-sdk";

export interface FieldProps {
  sdk: FieldExtensionSDK;
  cma: PlainClientAPI;
}

export interface TrainingPhraseItem {
  id: string;
  text: string;
  entityLables: EntityLabel[];
}

export interface EntityLabel {
  entity: string;
  startPos: number;
  endPos: number;
}
