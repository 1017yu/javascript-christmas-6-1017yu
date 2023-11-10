/* eslint-disable max-lines-per-function */
import { ERROR_MESSAGES } from '../../src/constants/messages';
import VisitDate from '../../src/domain/VisitDate';

describe('VisitDate 클래스 테스트', () => {
  test('1 이상 31 이하의 유효한 입력이라면, 인스턴스를 생성한다.', () => {
    const date = '15';
    const visitDate = new VisitDate(date);

    expect(visitDate).toBeInstanceOf(VisitDate);
  });

  test.each(['1', '25', '31'])(
    '1 이상 31 이하의 유효한 입력이라면, 에러를 발생시키지 않는다.',
    date => {
      expect(() => new VisitDate(date)).not.toThrow();
    },
  );

  test.each(['0', '33', 0, 32, null])(
    '1 이상 31 이하의 입력이 아니라면, 에러를 발생한다',
    date => {
      expect(() => new VisitDate(date)).toThrow(ERROR_MESSAGES.prefix);
    },
  );
});
