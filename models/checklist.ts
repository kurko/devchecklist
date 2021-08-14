import yaml from 'js-yaml';
import fs from 'fs';

// Get document, or throw exception on error

export class ChecklistModel {
  constructor() {
  }

  checklist(): string[] {
    var doc;

    try {
      doc = yaml.load(fs.readFileSync('data/checklist.ptbr.yml', 'utf8'));
    } catch (e) {
      console.log(e);
    }

    return doc.checklist;
  }
}
