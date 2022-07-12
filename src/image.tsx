import React from 'react';

export const icons = [
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/root_folder_open.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/folder_open.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/javascript.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/folder_open.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/html.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/folder_closed.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/file.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/css.png',
  'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/csharp.png',
];

export const getRandomIcon = () => {
  return icons[Math.floor(Math.random() * icons.length)];
};

// from https://stackoverflow.com/a/71604665
export async function imageUrlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((onSuccess, onError) => {
    try {
      const reader = new FileReader();
      reader.onload = function () {
        onSuccess(this.result as string);
      };
      reader.readAsDataURL(blob);
    } catch (e) {
      onError(e);
    }
  });
}

export const AsyncImage = ({
  src,
  width = 0,
  height = 0,
}: {
  src: string;
  width?: number | string;
  height?: number | string;
}) => {
  const [image, setImage] = React.useState<string | undefined>(undefined);
  React.useEffect(() => {
    imageUrlToBase64(src).then((image) => setImage(image));
  }, [image]);

  return image ? (
    <img src={image} width={width ? width : ''} height={height ? height : ''} alt="Async image" />
  ) : (
    <div>Loading...</div>
  );
};
