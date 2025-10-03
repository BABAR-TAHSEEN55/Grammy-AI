export type MessageMetadata = {
  tone: string;
  style: string;
  context: string;
};
export type MessagePart = {
  type: string;
  text: string;
};
export type SessionReturn = {
  id: string;
};

export interface ItemProps {
  title: string;
  url: string;
  Icon: React.ComponentType;
}

export interface CustomProps {
  tone: string;
  setTone: (tone: string) => void;
}

export interface CustomProps2 {
  style?: string;
  setStyle: (style: string) => void;
}
