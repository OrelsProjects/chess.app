/*
A type of:
    svg: defaultPlayer,
        first_name: result?.first_name + " " + result?.last_name,
        rating_israel: result?.rating_israel,
        image: images.icons.players,
        starImage: images.icons.star,
        wgmImage: images.icons.wgm,
        badge: result?.badge,
      }))
*/

import { CancelToken } from "axios";

export interface ISearchOpponentProps {
  svg: string;
  first_name: string;
  rating_israel: string;
  image: string;
  starImage: string;
  wgmImage: string;
  badge: string;
}

export interface IGameProps {
  name: string;
  value: string;
}

export interface IUseRefProps {
  open: (message?: string) => void;
  close: (message?: string) => void;
  cancel: (message?: string) => void;
  token?: CancelToken;
}
