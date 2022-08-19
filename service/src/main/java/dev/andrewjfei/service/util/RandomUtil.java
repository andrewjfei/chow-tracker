package dev.andrewjfei.service.util;

import java.util.List;
import java.util.Random;

public class RandomUtil {

    private static final Random random = new Random();

    public static int getRandomIndex(int size) {
        return random.nextInt(size);
    }

    public static <C> C selectRandomFromList(List<C> list) {
        int index = getRandomIndex(list.size());
        return list.get(index);
    }
}
