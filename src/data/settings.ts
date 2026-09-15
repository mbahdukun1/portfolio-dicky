export interface ComingSoonSettings {
  show: boolean;
  label: string;
  showCount: boolean;
  placement: 'inline' | 'end';
}

export const comingSoonSettings: ComingSoonSettings = {
  show: true,
  label: 'Coming soon',
  showCount: true,
  placement: 'end',
};
