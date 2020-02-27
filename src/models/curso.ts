export class Curso {

  public _id: string;
  public title: string;
  public img: string;
  public date: string;
  public aulas: Array<any>;
  public certificateSend: boolean;

  constructor(object) {
    if (object) {
      this._id = object._id;
      this.title = object.title;
      this.img = object.img;
      this.date = object.date;
      this.aulas = object.aulas;
    }
  }

  public getPercent() {
    let aulasDone = this.aulas.filter(obj => {
      if (obj.done)
        return obj;
    });
    return ((aulasDone.length * 100) / this.aulas.length).toFixed();
  }
}
