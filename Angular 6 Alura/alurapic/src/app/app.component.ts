import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { filter, map, switchMap } from 'rxjs/operators';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'ap-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {

    /**
     * Se inscreve nos eventos da rota.
     * Pipe 'filter' verifica se a rota atual está sendo finalizada através de 'NavigationEnd'.
     * Se sim, é acessado através do operador 'map' o 'activatedRoute' que posteriormete esta rota
     * será navegada até o primeiro valor da hierarquia (que é a rota que está sendo ativada no momento).
     * Quando está rota que está sendo ativada for encontrada, será feito um 'switchMap' para se ter acesso
     * a os dados (data) da rota. Com acesso a estes dados, será feito um 'subscribe' que dará acesso ao título
     * da página que foi carregada, este título é setado para o 'titleService' que se encarregará de mostrar este
     * título no navegador.
     */
    this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .pipe(map(() => this.activatedRoute))
        .pipe(map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }))
        .pipe(switchMap(route => route.data))
        .subscribe(event => this.titleService.setTitle(event.title));
  }
}
