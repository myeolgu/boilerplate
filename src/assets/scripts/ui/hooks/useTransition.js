/**
 * temp timeline
 * @returns
 */
function useTransition() {
  // select
  const useSelectShow = (target, type, option) => {
    if (!target) {return;}
    const timeline = gsap.timeline({ paused: true });

    const optionList = {
      fast: { duration: 0.15 },
      normal: { duration: 0.3 },
      slow: { duration: 0.7 },
    };
    const gsapOption = { ...optionList[type], ...option };

    timeline.to(target, {
      alpha: 0,
      ease: 'linear',
      onComplete() {
        target.style.display = 'none';
      },
      ...gsapOption,
    });

    return {
      timelineEl: timeline._recent.vars,
      timeline: (state) => {
        state
          ? gsap.to(target, {
            onStart: () => {
              target.style.display = 'block';
            },
            ease: 'linear',
            alpha: 1,
            ...gsapOption,
          })
          : gsap.to(target, {
            alpha: 0,
            ease: 'linear',
            onComplete() {
              target.style.display = 'none';
              target.closest('.component-select').classList.remove('show');
              target.closest('.component-select').classList.add('hide');
            },
            ...gsapOption,
          });
      },
    };
  };

  const selectDimmShow = (target) => {
    if (!target) {return;}

    gsap.to(target, {
      onStart: () => {
        target.style.display = 'block';
      },
      ease: 'linear',
      alpha: 0.6,
      duration: 0.15,
      overwrite: true,
    });
  };

  const selectDimmClose = (target) => {
    if (!target) {return;}

    gsap.to(target, {
      alpha: 0,
      ease: 'linear',
      duration: 0.15,
      onComplete() {
        target.style.display = 'none';
      },
    });
  };

  return {
    useSelectShow,
    selectDimmShow,
    selectDimmClose,
  };
}
