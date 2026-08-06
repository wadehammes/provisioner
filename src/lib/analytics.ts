export enum ActionTypes {
  StartProjectFormSubmitted = "submit_start_project_form",
}

export enum EventTypes {
  FormSubmit = "formSubmit",
}

interface SegmentEventProps {
  [key: string]: string | number | boolean;
  action: string | ActionTypes;
  category: string;
  label: string;
  value: string | boolean;
}

interface TrackEventProps {
  event: EventTypes;
  properties: SegmentEventProps;
}

export const trackEvent = ({ event, properties }: TrackEventProps) =>
  window.dataLayer?.push({ event, ...properties });
