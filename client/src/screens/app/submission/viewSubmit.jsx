import { Button } from "@mui/material";
import {
  KeyboardArrowLeftOutlined as ArrowLeftIcon,
  KeyboardArrowRightOutlined as ArrowRightIcon,
} from "@mui/icons-material";
import responseStatus from "../../../utils/status";

function ViewSubmit({ drawerStatus, response, user, doc }) {
  const { status } = response;
  const submitStatus = responseStatus(status);
  return (
    status && (
      <div className="viewsubmit">
        <div className="viewsubmit__header">
          <div className="viewsubmit__header--status">
            <h4>Заявка ID: {String(doc.id).toUpperCase().slice(0, 7)}</h4>
            <p className="text-disabled subtitle margin-top">
              {new Date(doc.timeStamp.seconds * 1000).toDateString()},
              {new Date(doc.timeStamp.seconds * 1000).toTimeString()}
            </p>
          </div>
          <div className="viewsubmit__header--options">
            <Button>Создать копию</Button>
            <Button>
              <ArrowLeftIcon />К списку
            </Button>
          </div>
        </div>
        <div className="viewsubmit__content">
          <div className="viewsubmit__content--list viewlist">
            <div
              className={`viewlist__status--header status__header--${submitStatus.status} text-white`}
            >
              <h4 className="circle--white">Статус</h4>
              <h4>{submitStatus.text}</h4>
            </div>
            <div className="viewlist__status--header">
              <h4 className="circle--blue">Ожидается подтверждением клиенту</h4>
              <div className="display-column-center">
                <h4>
                  Ответственный:{" "}
                  <span className="focus-blue">
                    {JSON.parse(localStorage.getItem("user")).fullname}
                  </span>
                </h4>
                <h4 className="margin-top">
                  Контактная информация:{" "}
                  <span className="text-disabled">
                    +{JSON.parse(localStorage.getItem("user")).number}
                  </span>
                </h4>
              </div>
            </div>
            <div className="viewlist__status">
              <h4 className="viewlist__status--title">
                Заявка ID: {String(doc.id).toUpperCase().slice(0, 7)}
              </h4>
              <p className="text-disabled margin-top-small subtitle">
                {new Date(doc.timeStamp.seconds * 1000).toDateString()},
                {new Date(doc.timeStamp.seconds * 1000).toTimeString()}
              </p>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Выбор процедуры
                </h4>
                <p className="text-disabled subtitle">{doc.procedure}</p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Выбор режима
                </h4>
                <p className="subtitle focus-blue">{doc.rejim}</p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Транспортная накладная (TIR,CMR,жд,накладная,авиа
                  накладная,коносамент и т.д)
                </h4>
                <p className="subtitle focus-blue">
                  {" "}
                  {String(doc.transportNak).slice(75, 90) +
                    "." +
                    String(doc.transportNak).slice(
                      String(doc.transportNak).indexOf("alt") - 4,
                      String(doc.transportNak).indexOf("alt") - 1
                    )}
                </p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Инвойс
                </h4>
                <p className="subtitle focus-blue">
                  {String(doc.invoice).slice(75, 90) +
                    "." +
                    String(doc.invoice).slice(
                      String(doc.invoice).indexOf("alt") - 4,
                      String(doc.invoice).indexOf("alt") - 1
                    )}
                </p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Упаковочный лист
                </h4>
                <p className="subtitle focus-blue">
                  {" "}
                  {String(doc.packageList).slice(75, 90) +
                    "." +
                    String(doc.packageList).slice(
                      String(doc.packageList).indexOf("alt") - 4,
                      String(doc.packageList).indexOf("alt") - 1
                    )}
                </p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Контракт
                </h4>
                <p className="subtitle focus-blue">
                  {" "}
                  {String(doc.contract).slice(75, 90) +
                    "." +
                    String(doc.contract).slice(
                      String(doc.contract).indexOf("alt") - 4,
                      String(doc.contract).indexOf("alt") - 1
                    )}
                </p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Сертефикат происхождения
                </h4>
                <p className="subtitle focus-blue">
                  {" "}
                  {String(doc.certificate).slice(75, 90) +
                    "." +
                    String(doc.certificate).slice(
                      String(doc.certificate).indexOf("alt") - 4,
                      String(doc.certificate).indexOf("alt") - 1
                    )}
                </p>
              </div>
            </div>
            <div className="viewlist__status">
              <h4 className="viewlist__status--title">
                Информация по декларированию
              </h4>
              <p className="text-disabled margin-top-small subtitle">
                от 15 октября 2022 г в. 16:56
              </p>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Режим
                </h4>
                <p className="subtitle text-disabled">
                  Выпуск для свободного ообращения (импорт) [40]
                </p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Список необходимых разрешительных док-в
                </h4>
                <p className="subtitle focus-blue">Сертефикат соотвестия</p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Метод
                </h4>
                <p className="subtitle focus-blue">Резериный</p>
              </div>
              <div className="viewlist__status--submits display-flex-between">
                <h4 className="viewlist__status--submits-name subtitle">
                  Пост
                </h4>
                <p className="subtitle focus-blue">
                  Томоженный пост ВЭД "Аркбулак"
                </p>
              </div>
            </div>
          </div>
          <div className="viewsubmit__content--history">
            <h3>History</h3>
            <div className="viewhistory">
              <div className="viewhistory__details display-flex-between">
                <h4 className="subtitle">Стадия изменена</h4>
                <h4 className="text-disabled subtitle">29.12.2022г в 15:32</h4>
                <h4 className="subtitle">{user.name}</h4>
              </div>
              <div className="viewhistory__directions">
                <h4 className="viewhistory__directions--to">WON</h4>
                <ArrowRightIcon />
                <h4 className="viewhistory__directions--to subtitle">
                  Выставыть счё на оплату
                </h4>
              </div>
            </div>
            <div className="viewhistory">
              <div className="viewhistory__details display-flex-between">
                <h4 className="subtitle">Стадия изменена</h4>
                <h4 className="text-disabled subtitle">29.12.2022г в 15:32</h4>
                <h4 className="subtitle">{user.name}</h4>
              </div>
              <div className="viewhistory__directions">
                <h4 className="viewhistory__directions--to">
                  Оценка стоимости декларирования
                </h4>
                <ArrowRightIcon />
                <h4 className="viewhistory__directions--to subtitle">WON</h4>
              </div>
            </div>
            <div className="viewhistory">
              <div className="viewhistory__details display-flex-between">
                <h4 className="subtitle">Стадия изменена</h4>
                <h4 className="text-disabled subtitle">29.12.2022г в 15:32</h4>
                <h4 className="subtitle">{user.name}</h4>
              </div>
              <div className="viewhistory__directions">
                <h4 className="viewhistory__directions--to">
                  Поверка документов
                </h4>
                <ArrowRightIcon />
                <h4 className="viewhistory__directions--to subtitle">
                  Документы корректы
                </h4>
              </div>
            </div>
            <div className="viewhistory__checkers display-flex-between">
              <h4 className="subtitle">Создона заявка</h4>
              <h4 className="text-disabled subtitle">
                {" "}
                {new Date(doc.timeStamp.seconds * 1000).toDateString()},
              </h4>
              <h4 className="subtitle">
                {" "}
                {JSON.parse(localStorage.getItem("user")).fullname}
              </h4>
            </div>
          </div>
        </div>
        <div className="viewtaxes">
          <h3>Спецификация к декларирования</h3>
          <div className="viewtaxes__header">
            <ul>
              <li>Наименование</li>
              <li>Цена</li>
              <li>Кол-во</li>
              <li>Ед. Измерения</li>
              <li>Налог</li>
              <li>НДС</li>
              <li>Итого</li>
            </ul>
          </div>
          <div className="viewtaxes__list">
            <ul>
              <li>1.Общая стоимость декларирования</li>
              <li>900 000.00</li>
              <li>900 000.00</li>
              <li>шт.</li>
              <li>15%</li>
              <li>135 000</li>
              <li>1 035 000.00</li>
            </ul>
          </div>
          <div className="viewtaxes__list">
            <ul>
              <li>2. Таможенные платежи: таможенные сборы</li>
              <li>245 000.00</li>
              <li>245 000.00</li>
              <li>шт.</li>
              <li>15%</li>
              <li>0</li>
              <li>245 000.00</li>
            </ul>
          </div>
          <div className="viewtaxes__list">
            <ul>
              <li>3. Таможенные платежы: Пошлина</li>
              <li>24 500 000.00</li>
              <li>24 500 000.000</li>
              <li>шт.</li>
              <li>15%</li>
              <li>0</li>
              <li>24 500 000.00</li>
            </ul>
          </div>
          <div className="viewtaxes__list">
            <ul>
              <li>3. Таможенные платежы: НДС</li>
              <li>3 500 000.00</li>
              <li>3 500 000.00</li>
              <li>шт.</li>
              <li>15%</li>
              <li>0</li>
              <li>3 500 000.00</li>
            </ul>
          </div>
        </div>
        <div className="viewcost">
          <div className="viewcost__line">
            <h4>Сумма без НДС:</h4>
            <p>29 145 000 UZS</p>
          </div>
          <div className="viewcost__line">
            <h4>НДС:</h4>
            <p>135 000 UZS</p>
          </div>
          <div className="viewcost__line">
            <h4>Общая сумма:</h4>
            <p>29 280 000 UZS</p>
          </div>
        </div>
        <div className="viewsubmit__form">
          <Button className="viewsubmit__form--accept" onClick={drawerStatus}>
            Согласиться c условиями
          </Button>
          <Button className="viewsubmit__form--decline" onClick={drawerStatus}>
            Отказаться
          </Button>
          {doc.completedFile && (
            <Button 
              type={'link'}
              className="viewsubmit__form--accept margin-left-1" onClick={drawerStatus}
              target={'_blank'}
              href={doc.completedFile}
            >
                Скачать файл
            </Button>
          )}
        </div>
      </div>
    )
  );
}
export default ViewSubmit;
