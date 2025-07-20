// Animal data for all available animals
export interface AnimalData {
  name: string;
  sound: string;
  emoji: string;
  audio: string;
}

export const animals: AnimalData[] = [
  { name: 'Lion', sound: 'roar', emoji: '🦁', audio: '/audios/animals/lion.mp3' },
  { name: 'Elephant', sound: 'trumpet', emoji: '🐘', audio: '/audios/animals/elephant.mp3' },
  { name: 'Monkey', sound: 'chatter', emoji: '🐵', audio: '/audios/animals/monkey.mp3' },
  { name: 'Cow', sound: 'moo', emoji: '🐄', audio: '/audios/animals/cow.mp3' },
  { name: 'Cat', sound: 'meow', emoji: '🐱', audio: '/audios/animals/cat.mp3' },
  { name: 'Dog', sound: 'bark', emoji: '🐶', audio: '/audios/animals/dog.mp3' },
  { name: 'Bear', sound: 'growl', emoji: '🐻', audio: '/audios/animals/bear.mp3' },
  { name: 'Frog', sound: 'croak', emoji: '🐸', audio: '/audios/animals/frog.mp3' },
  { name: 'Mouse', sound: 'squeak', emoji: '🐭', audio: '/audios/animals/mouse.mp3' },
  { name: 'Chicken', sound: 'cluck', emoji: '🐔', audio: '/audios/animals/chicken.mp3' },
]; 