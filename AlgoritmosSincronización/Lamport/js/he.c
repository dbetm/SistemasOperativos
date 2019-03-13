#include <stdio.h>

int main(int argc, char const *argv[]) {
    int n, i;
    unsigned long long res = 0;
    scanf("%d", &n);
    unsigned long long sumas[n+1];
    for (i = 1; i <= n; i++) {
        sumas[i] = ((i * (i+1)) / 2) + sumas[i-1];
        res += sumas[i];
    }
    printf("%llu\n", res);
    return 0;
}
