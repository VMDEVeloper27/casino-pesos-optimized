'use client';

import { useState, useMemo } from 'react';
import { Calculator, DollarSign, Target, Clock, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface BonusCalculatorProps {
  bonusPercentage?: number;
  maxBonus?: number;
  wageringRequirement?: number;
  minDeposit?: number;
  casinoName?: string;
  className?: string;
}

export default function BonusCalculator({
  bonusPercentage = 100,
  maxBonus = 5000,
  wageringRequirement = 35,
  minDeposit = 100,
  casinoName = '',
  className = ''
}: BonusCalculatorProps) {
  const [depositAmount, setDepositAmount] = useState(500);
  const [averageBetSize, setAverageBetSize] = useState(20);

  // Calculate bonus details
  const calculations = useMemo(() => {
    const bonusAmount = Math.min((depositAmount * bonusPercentage) / 100, maxBonus);
    const totalBalance = depositAmount + bonusAmount;
    const totalWagering = bonusAmount * wageringRequirement;
    const numberOfBets = Math.ceil(totalWagering / averageBetSize);
    const estimatedHours = Math.ceil(numberOfBets / 60); // Assuming 60 bets per hour
    
    return {
      bonusAmount,
      totalBalance,
      totalWagering,
      numberOfBets,
      estimatedHours,
      wageringPercentage: Math.min((depositAmount / totalWagering) * 100, 100)
    };
  }, [depositAmount, bonusPercentage, maxBonus, wageringRequirement, averageBetSize]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()} MXN`;
  };

  const formatHours = (hours: number) => {
    if (hours < 24) {
      return `${hours} horas`;
    }
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours === 0) {
      return `${days} días`;
    }
    return `${days} días, ${remainingHours} horas`;
  };

  return (
    <div className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">Calculadora de Bonos</h3>
            {casinoName && (
              <p className="text-green-50 text-sm">{casinoName}</p>
            )}
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 space-y-6">
        {/* Deposit Input */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4" />
            Monto del Depósito
          </label>
          <div className="relative">
            <input
              type="range"
              min={minDeposit}
              max="10000"
              step="100"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, rgb(34 197 94) 0%, rgb(34 197 94) ${
                  ((depositAmount - minDeposit) / (10000 - minDeposit)) * 100
                }%, rgb(229 231 235) ${
                  ((depositAmount - minDeposit) / (10000 - minDeposit)) * 100
                }%, rgb(229 231 235) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{formatCurrency(minDeposit)}</span>
              <span>{formatCurrency(10000)}</span>
            </div>
          </div>
          <div className="mt-3">
            <input
              type="number"
              min={minDeposit}
              max="10000"
              step="100"
              value={depositAmount}
              onChange={(e) => setDepositAmount(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-center text-xl font-bold text-gray-900"
            />
          </div>
        </div>

        {/* Average Bet Size */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Target className="w-4 h-4" />
            Tamaño Promedio de Apuesta
          </label>
          <select
            value={averageBetSize}
            onChange={(e) => setAverageBetSize(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <option value="10">$10 MXN (Conservador)</option>
            <option value="20">$20 MXN (Moderado)</option>
            <option value="50">$50 MXN (Normal)</option>
            <option value="100">$100 MXN (Alto)</option>
            <option value="200">$200 MXN (Muy Alto)</option>
          </select>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {/* Bonus Amount */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Bono Recibido</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(calculations.bonusAmount)}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {bonusPercentage}% hasta {formatCurrency(maxBonus)}
            </p>
          </motion.div>

          {/* Total Balance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Balance Total</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(calculations.totalBalance)}
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <span>Depósito: {formatCurrency(depositAmount)}</span>
              <span>+</span>
              <span>Bono: {formatCurrency(calculations.bonusAmount)}</span>
            </div>
          </motion.div>

          {/* Wagering Requirement */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-orange-50 border border-orange-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Info className="w-4 h-4" />
                Total a Apostar (Rollover)
              </span>
              <span className="text-2xl font-bold text-orange-600">
                {formatCurrency(calculations.totalWagering)}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progreso con tu depósito</span>
                <span>{calculations.wageringPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(calculations.wageringPercentage, 100)}%` }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-gradient-to-r from-orange-400 to-orange-500 h-full rounded-full"
                />
              </div>
            </div>
            
            <p className="text-xs text-gray-500">
              Requisito: {wageringRequirement}x el bono
            </p>
          </motion.div>

          {/* Time Estimate */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-purple-50 border border-purple-200 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Tiempo Estimado
              </span>
              <span className="text-lg font-bold text-purple-600">
                {formatHours(calculations.estimatedHours)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div>
                <span className="block text-gray-500">Número de apuestas</span>
                <span className="font-semibold">{calculations.numberOfBets.toLocaleString()}</span>
              </div>
              <div>
                <span className="block text-gray-500">Apuesta promedio</span>
                <span className="font-semibold">{formatCurrency(averageBetSize)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-semibold mb-1">Consejos Importantes:</p>
              <ul className="space-y-1 text-xs">
                <li>• Los juegos de slots generalmente contribuyen 100% al rollover</li>
                <li>• Los juegos de mesa pueden contribuir solo 10-20%</li>
                <li>• Verifica los términos y condiciones específicos del casino</li>
                <li>• Juega responsablemente y dentro de tu presupuesto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}