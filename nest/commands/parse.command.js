import { Command, Option } from 'nest-commander';
import { ParseProvider } from '../src/Modules/parse.provider';
import { Dependencies } from '@nestjs/common';

@Command({name: 'set-collections'})
@Dependencies(ParseProvider)
export class SetCollectionsCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run() {
    await this.parsing.setCollections();
  }
}

@Command({name: 'update-stats'})
@Dependencies(ParseProvider)
export class UpdateCollectionsCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run(
    passedParams
  ) {
    const limit = +passedParams[0] || 1;
    const order = passedParams[1] ? +passedParams[1] - 1 : 0;

    if (limit < 1 || order < 0) {
      return new Error("params can't be less than 1");
    }

    this.parsing.writeAdvancedLogs('Parsing started');

    await this.parsing.setStats({ limit, order });
  }
}

@Command({name: 'update-images'})
@Dependencies(ParseProvider)
export class UpdateCollectionsImagesCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run() {
    await this.parsing.editImages();
  }
}

@Command({name: 'remove-duplicates'})
@Dependencies(ParseProvider)
export class RemoveDuplicatesCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run() {
    await this.parsing.startRemoveDuplicates();
  }
}

@Command({name: 'update-collections'})
@Dependencies(ParseProvider)
export class AddCollectionsCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run(
    passedParams
  ) {
    if (passedParams.length !== 1) return new Error('hmm');

    const filename = passedParams[0];

    await this.parsing.updateCollections(filename);
  }
}

@Command({name: 'check-parser'})
@Dependencies(ParseProvider)
export class CheckParserCommand {
  constructor(parseProvider) {
    this.parsing = parseProvider;
  }

  async run() {
    await this.parsing.checkParser();
  }
}
