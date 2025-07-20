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
  { name: 'Tiger', sound: 'roar', emoji: '🐯', audio: '/audios/animals/tiger.mp3' },
  { name: 'Horse', sound: 'neigh', emoji: '🐴', audio: '/audios/animals/horse.mp3' },
  { name: 'Gull', sound: 'screech', emoji: '🕊️', audio: '/audios/animals/gull.mp3' },
  { name: 'Cow', sound: 'moo', emoji: '🐄', audio: '/audios/animals/cow.mp3' },
  { name: 'Goat', sound: 'baa', emoji: '🐐', audio: '/audios/animals/goat.mp3' },
  { name: 'Sheep', sound: 'baa', emoji: '🐑', audio: '/audios/animals/sheep.mp3' },
  { name: 'Pig', sound: 'oink', emoji: '🐖', audio: '/audios/animals/pig.mp3' },
  { name: 'Dog', sound: 'bark', emoji: '🐶', audio: '/audios/animals/dog.mp3' },
  { name: 'Cat', sound: 'meow', emoji: '🐱', audio: '/audios/animals/cat.mp3' },
  { name: 'Chicken', sound: 'cluck', emoji: '🐔', audio: '/audios/animals/chicken.mp3' },
  { name: 'Duck', sound: 'quack', emoji: '🦆', audio: '/audios/animals/duck.mp3' },
  { name: 'Frog', sound: 'croak', emoji: '🐸', audio: '/audios/animals/frog.mp3' },
  { name: 'Owl', sound: 'hoot', emoji: '🦉', audio: '/audios/animals/owl.mp3' },
  { name: 'Parrot', sound: 'squawk', emoji: '🦜', audio: '/audios/animals/parot.mp3' },
]; 