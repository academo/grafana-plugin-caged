import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { AsyncImage, getRandomIcon, imageUrlToBase64 } from 'image';
import { css } from 'emotion';

const mainImage = 'https://raw.githubusercontent.com/GabeStep/cage-icons/master/fileicons/images/json.png';

interface Props extends PanelProps<SimpleOptions> {}
export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  React.useEffect(() => {
    cageImages();
  }, []);
  return (
    <div
      className={css`
        width: ${width}px;
        height: ${height}px;
        text-align: center;
      `}
    >
      <h2>You are caged</h2>
      <AsyncImage height="70%" src={mainImage} />
    </div>
  );
};

function cageImages() {
  const svgs = document.querySelectorAll('svg');
  for (const svg of svgs) {
    const newImage = document.createElement('img');
    const parent = svg.parentElement;
    const width = svg.getAttribute('width');
    const height = svg.getAttribute('height');
    if (parent && width && height) {
      newImage.width = parseInt(width, 10);
      newImage.height = parseInt(height, 10);

      imageUrlToBase64(getRandomIcon()).then((base64) => {
        newImage.src = base64;
        parent.replaceChild(newImage, svg);
      });
    }
  }
}
