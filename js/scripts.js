import {
  PALAVRAS_POR_IDIOMA,
  TAMANHO_PALAVRA,
  MAX_TENTATIVAS,
} from "./data/palavras.js";

import { JogoModel } from "./models/JogoModel.js";
import { JogoView } from "./views/JogoView.js";
import { JogoController } from "./controllers/JogoController.js";

const model = new JogoModel(
  PALAVRAS_POR_IDIOMA,
  TAMANHO_PALAVRA,
  MAX_TENTATIVAS
);

const view = new JogoView();

const controller = new JogoController(model, view);

controller.iniciar();